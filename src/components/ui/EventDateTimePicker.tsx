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
  '10:00 AM (Morning Brunch)',
  '11:00 AM (Midday Lunch)',
  '11:30 AM',
  '12:00 PM (Luncheon)',
  '12:30 PM',
  '1:00 PM',
  '2:00 PM (Afternoon)',
  '3:00 PM',
  '4:00 PM (Late Afternoon)',
  '5:00 PM (Cocktail Hour)',
  '5:30 PM',
  '6:00 PM (Evening Reception)',
  '6:30 PM',
  '7:00 PM (Gala Dinner)',
  '7:30 PM',
  '8:00 PM',
];

const POPULAR_END_TIMES = [
  'Select end time...',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM (Standard Evening)',
  '10:30 PM',
  '11:00 PM (Late Night)',
  '11:30 PM',
  '12:00 AM (Midnight)',
  '1:00 AM (Afterparty)',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '24px 32px',
        }}
      >
        {/* 1. Event Date Picker */}
        <div style={{ position: 'relative' }} ref={calendarRef}>
          <label
            htmlFor={`${idPrefix}-date`}
            className="inquiry-field-label"
          >
            Event Date {required && <span className="required-star">*</span>}
          </label>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              id={`${idPrefix}-date`}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="inquiry-text-input"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                cursor: 'pointer',
                borderColor: dateError ? '#DC2626' : undefined,
                boxShadow: dateError ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                color: date ? '#181519' : '#8C8692',
                fontWeight: date ? 500 : 400,
              }}
            >
              <span>{displayDateText() || 'Select event date...'}</span>
              <span style={{ fontSize: '16px', color: '#592367', flexShrink: 0, marginLeft: '8px' }}>
                📅
              </span>
            </button>

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
            <p
              style={{
                color: '#DC2626',
                fontSize: '12.5px',
                marginTop: '6px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>⚠️</span> {dateError}
            </p>
          )}

          {/* Interactive Luxury Calendar Popover */}
          {isCalendarOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                zIndex: 50,
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                boxShadow: '0 16px 40px rgba(89, 35, 103, 0.16), 0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid rgba(89, 35, 103, 0.18)',
                padding: '20px',
                width: '320px',
                maxWidth: 'calc(100vw - 40px)',
              }}
            >
              {/* Header: Month & Year with Prev/Next Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF5FB',
                    color: '#592367',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: '1px solid rgba(89, 35, 103, 0.12)',
                  }}
                  title="Previous Month"
                >
                  ‹
                </button>

                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#592367',
                  }}
                >
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF5FB',
                    color: '#592367',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: '1px solid rgba(89, 35, 103, 0.12)',
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
                  marginBottom: '8px',
                }}
              >
                {DAYS_OF_WEEK.map((d, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#8C8692',
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
                  gap: '4px',
                  textAlign: 'center',
                }}
              >
                {/* Empty slots for first week padding */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ height: '34px' }} />
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
                        height: '34px',
                        width: '34px',
                        margin: '0 auto',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: selected || isToday ? 700 : 400,
                        backgroundColor: selected
                          ? '#592367'
                          : isToday
                          ? '#FAF5FB'
                          : 'transparent',
                        color: selected
                          ? '#FFFFFF'
                          : past
                          ? '#D0CBD4'
                          : isToday
                          ? '#592367'
                          : '#181519',
                        border: isToday && !selected ? '1px solid #592367' : 'none',
                        cursor: past ? 'not-allowed' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!selected && !past) {
                          e.currentTarget.style.backgroundColor = '#F3E7F6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selected && !past) {
                          e.currentTarget.style.backgroundColor = isToday ? '#FAF5FB' : 'transparent';
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
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F0EAF2',
                  fontSize: '12px',
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
                    color: '#592367',
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
                    color: '#8C8692',
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Start Time Selector */}
        <div>
          <label
            htmlFor={`${idPrefix}-start-time`}
            className="inquiry-field-label"
          >
            Event Start Time
          </label>
          <select
            id={`${idPrefix}-start-time`}
            className="inquiry-select-input"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
          >
            {POPULAR_START_TIMES.map((t, i) => (
              <option key={i} value={i === 0 ? '' : t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* 3. End Time Selector */}
        <div>
          <label
            htmlFor={`${idPrefix}-end-time`}
            className="inquiry-field-label"
          >
            Event End Time
          </label>
          <select
            id={`${idPrefix}-end-time`}
            className="inquiry-select-input"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
          >
            {POPULAR_END_TIMES.map((t, i) => (
              <option key={i} value={i === 0 ? '' : t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
