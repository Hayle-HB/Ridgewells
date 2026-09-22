'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface EventDateTimePickerProps {
  date: string;
  startTime: string;
  endTime: string;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  dateError?: string;
  required?: boolean;
  idPrefix?: string;
}

const POPULAR_START_TIMES = [
  'Select start time...',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
];

const POPULAR_END_TIMES = [
  'Select end time...',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function EventDateTimePicker({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  dateError,
  required = true,
  idPrefix = 'inquiry',
}: EventDateTimePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Calendar month/year navigation state
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Close calendar popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Calendar grid calculation
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(viewYear, viewMonth, day);
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const formattedIso = `${yyyy}-${mm}-${dd}`;

    onDateChange(formattedIso);
    setIsCalendarOpen(false);
  };

  // Helper to format currently selected date
  const displayDateText = () => {
    if (!date) return '';
    if (date.includes('-') && date.length === 10) {
      const parts = date.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
    }
    return date;
  };

  // Check if a calendar day is selected
  const isDaySelected = (day: number) => {
    if (!date) return false;
    const yyyy = viewYear;
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const targetIso = `${yyyy}-${mm}-${dd}`;
    return date.startsWith(targetIso) || date === targetIso;
  };

  // Check if a calendar day is today
  const isDayToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  // Check if day is in past
  const isDayPast = (day: number) => {
    const checkDate = new Date(viewYear, viewMonth, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate < startOfToday;
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '12px 16px',
        }}
      >
        {/* 1. Event Date Picker with Minimalist Black/White Floating Label */}
        <div style={{ position: 'relative' }} ref={calendarRef}>
          <div
            className={`floating-field-wrapper ${date || isCalendarOpen ? 'is-floating' : ''} ${date ? 'has-value' : ''} ${isCalendarOpen ? 'is-focused' : ''} ${dateError ? 'has-error' : ''}`}
          >
            <button
              type="button"
              id={`${idPrefix}-date`}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="floating-field-input"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                cursor: 'pointer',
                color: date ? '#000000' : 'transparent',
                fontWeight: date ? 500 : 400,
              }}
            >
              <span>{displayDateText() || ''}</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginLeft: '8px' }}
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </button>

            <label htmlFor={`${idPrefix}-date`} className="floating-field-label">
              Target Event Date {required && <span>*</span>}
            </label>

            {/* Hidden native input for form accessibility */}
            <input
              type="text"
              readOnly
              value={date}
              tabIndex={-1}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: '1px', height: '1px' }}
            />
          </div>

          {dateError && (
            <p className="floating-field-error-text">
              {dateError}
            </p>
          )}

          {/* Minimalist Black & White Calendar Popover */}
          {isCalendarOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                zIndex: 50,
                backgroundColor: '#FFFFFF',
                borderRadius: '0px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E5E5E5',
                padding: '16px',
                width: '300px',
                maxWidth: 'calc(100vw - 32px)',
              }}
            >
              {/* Header: Month & Year with Prev/Next Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '1px solid #E5E5E5',
                  }}
                  title="Previous Month"
                >
                  ‹
                </button>

                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#000000',
                  }}
                >
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '1px solid #E5E5E5',
                  }}
                  title="Next Month"
                >
                  ›
                </button>
              </div>

              {/* Day of Week Headers */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  textAlign: 'center',
                  marginBottom: '6px',
                }}
              >
                {DAYS_OF_WEEK.map((d, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#777777',
                      textTransform: 'uppercase',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Day Number Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '2px',
                  textAlign: 'center',
                }}
              >
                {/* Empty slots for first week padding */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ height: '30px' }} />
                ))}

                {/* Day numbers */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const selected = isDaySelected(day);
                  const isToday = isDayToday(day);
                  const past = isDayPast(day);

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      disabled={past}
                      onClick={() => handleSelectDay(day)}
                      style={{
                        height: '30px',
                        width: '30px',
                        margin: '0 auto',
                        borderRadius: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: selected || isToday ? 700 : 400,
                        backgroundColor: selected
                          ? '#000000'
                          : isToday
                          ? '#F5F5F5'
                          : 'transparent',
                        color: selected
                          ? '#FFFFFF'
                          : past
                          ? '#CCCCCC'
                          : '#000000',
                        border: isToday && !selected ? '1px solid #000000' : 'none',
                        cursor: past ? 'not-allowed' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!selected && !past) {
                          e.currentTarget.style.backgroundColor = '#EEEEEE';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selected && !past) {
                          e.currentTarget.style.backgroundColor = isToday ? '#F5F5F5' : 'transparent';
                        }
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Quick Today & Clear Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid #EBEBEB',
                  fontSize: '11px',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    const todayDate = new Date();
                    setViewYear(todayDate.getFullYear());
                    setViewMonth(todayDate.getMonth());
                    handleSelectDay(todayDate.getDate());
                  }}
                  style={{
                    color: '#000000',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  Select Today
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDateChange('');
                    setIsCalendarOpen(false);
                  }}
                  style={{
                    color: '#777777',
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Start Time Selector (Pure Clean Times, No Extra Text) */}
        <div>
          <div className="floating-field-wrapper is-floating has-value">
            <select
              id={`${idPrefix}-start-time`}
              className="floating-field-select"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
            >
              {POPULAR_START_TIMES.map((t, i) => (
                <option key={i} value={i === 0 ? '' : t}>
                  {t}
                </option>
              ))}
            </select>
            <label htmlFor={`${idPrefix}-start-time`} className="floating-field-label">
              Start Time
            </label>
          </div>
        </div>

        {/* 3. End Time Selector (Pure Clean Times, No Extra Text) */}
        <div>
          <div className="floating-field-wrapper is-floating has-value">
            <select
              id={`${idPrefix}-end-time`}
              className="floating-field-select"
              value={endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
            >
              {POPULAR_END_TIMES.map((t, i) => (
                <option key={i} value={i === 0 ? '' : t}>
                  {t}
                </option>
              ))}
            </select>
            <label htmlFor={`${idPrefix}-end-time`} className="floating-field-label">
              End Time
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
