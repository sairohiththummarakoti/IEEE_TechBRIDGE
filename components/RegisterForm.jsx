'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { registration, site } from '../lib/content.js';
import { isPast } from '../lib/events.js';
import { submitForm } from '../lib/submit-form.js';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  {
    name: 'memberNumber',
    label: 'IEEE member number (optional)',
    type: 'text',
    inputMode: 'numeric',
    placeholder: 'e.g. 94012345',
    optional: true,
  },
  { name: 'company', label: 'Company / organization', type: 'text', autoComplete: 'organization' },
  { name: 'jobTitle', label: 'Job title', type: 'text', autoComplete: 'organization-title' },
  { name: 'experience', label: 'Years of experience', type: 'number', inputMode: 'numeric', min: 0 },
  { name: 'city', label: 'City / country', type: 'text', autoComplete: 'address-level2' },
];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  memberNumber: '',
  company: '',
  jobTitle: '',
  experience: '',
  city: '',
  needs: '',
  consent: false,
};

function validate(values) {
  const errors = {};
  FIELDS.forEach((field) => {
    if (!field.optional && !values[field.name].trim()) errors[field.name] = `${field.label} is required.`;
  });
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Enter an email address in the form name@example.org.';
  }
  if (values.experience.trim() && !(Number(values.experience) >= 0)) {
    errors.experience = 'Enter your years of experience as a number (0 or more).';
  }
  if (!values.consent) errors.consent = 'Please tick the box to register.';
  return errors;
}

export default function RegisterForm({ event }) {
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  // The server only renders this form while registration is open, but that
  // HTML can be up to an hour old. Re-check in the browser so a page cached
  // across the closing date doesn't keep taking registrations.
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    setClosed(isPast(event.isoDate));
  }, [event.isoDate]);

  const setField = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (showErrors) setErrors(validate(next));
      return next;
    });
  };

  const onSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const found = validate(values);
    setErrors(found);
    setShowErrors(true);
    if (Object.keys(found).length > 0) {
      const first = formRef.current?.querySelector('[aria-invalid="true"]');
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setStatus('submitting');
    try {
      await submitForm({ type: 'registration', eventId: event.id, eventTitle: event.title, ...values });
      setStatus('success');
    } catch (error) {
      // Same reasoning as the request form: friendly copy on the page, the
      // real cause in the console for whoever is debugging the endpoint.
      console.error('TechBridge event registration failed:', error);
      setStatus('error');
    }
  };

  const errorFor = (name) => (showErrors ? errors[name] : undefined);
  const errorCount = Object.keys(errors).length;

  if (closed) return <p className="empty-state">{registration.closed}</p>;

  return (
    <div className="register-card" id="register">
      <div className="register-head">
        <h2>{registration.heading}</h2>
        <p>{registration.intro}</p>
      </div>

      <div className="register-body">
        {status === 'success' ? (
          <div className="form-success" role="status">
            <span className="form-success-mark" aria-hidden="true">
              ✓
            </span>
            <h3>Registration received</h3>
            <p>
              Thank you. Your registration for {event.title} has been recorded under {values.email}.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <div className="register-fields">
              {FIELDS.map((field) => {
                const message = errorFor(field.name);
                return (
                  <p className="field" key={field.name}>
                    <label htmlFor={`${formId}-${field.name}`}>{field.label}</label>
                    <input
                      id={`${formId}-${field.name}`}
                      name={field.name}
                      type={field.type}
                      inputMode={field.inputMode}
                      min={field.min}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      aria-invalid={message ? 'true' : undefined}
                      aria-describedby={message ? `${formId}-${field.name}-error` : undefined}
                      onChange={(changeEvent) => setField(field.name, changeEvent.target.value)}
                    />
                    {message ? (
                      <span className="field-error" id={`${formId}-${field.name}-error`}>
                        {message}
                      </span>
                    ) : null}
                  </p>
                );
              })}

              <p className="field">
                <label htmlFor={`${formId}-needs`}>Accessibility or dietary needs (optional)</label>
                <textarea
                  id={`${formId}-needs`}
                  name="needs"
                  rows="3"
                  value={values.needs}
                  onChange={(changeEvent) => setField('needs', changeEvent.target.value)}
                />
              </p>
            </div>

            <p className="consent">
              <input
                id={`${formId}-consent`}
                name="consent"
                type="checkbox"
                checked={values.consent}
                aria-invalid={errorFor('consent') ? 'true' : undefined}
                aria-describedby={errorFor('consent') ? `${formId}-consent-error` : undefined}
                onChange={(changeEvent) => setField('consent', changeEvent.target.checked)}
              />
              <label htmlFor={`${formId}-consent`}>{registration.consent}</label>
              {errorFor('consent') ? (
                <span className="field-error" id={`${formId}-consent-error`}>
                  {errorFor('consent')}
                </span>
              ) : null}
            </p>

            <div aria-live="polite">
              {showErrors && errorCount > 0 ? (
                <p className="form-alert">
                  {errorCount} field{errorCount === 1 ? ' needs' : 's need'} attention before you can
                  register.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="form-alert">
                  Something went wrong sending your registration. Please try again, or email{' '}
                  {site.contactEmail}.
                </p>
              ) : null}
            </div>

            <button type="submit" className="btn btn-dark btn-block" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : registration.submitLabel}
            </button>

            <p className="register-note">
              <strong>{registration.note.lead}</strong> {registration.note.body}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
