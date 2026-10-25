'use client';

import { useId, useRef, useState } from 'react';
import { requestProgram, site } from '../lib/content.js';
import { submitForm } from '../lib/submit-form.js';
import { Eyebrow } from './primitives.jsx';
import { Honeypot, useSpamGuard } from './SpamGuard.jsx';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'chapter', label: 'Chapter / section', type: 'text', autoComplete: 'organization' },
  { name: 'region', label: 'Country / IEEE region', type: 'text', autoComplete: 'country-name' },
  { name: 'topic', label: 'Topic requested', type: 'text' },
  { name: 'attendees', label: 'Expected attendees', type: 'number', inputMode: 'numeric', min: 1 },
];

const EMPTY = { name: '', email: '', chapter: '', region: '', topic: '', attendees: '', details: '' };

function validate(values) {
  const errors = {};
  FIELDS.forEach((field) => {
    if (!values[field.name].trim()) errors[field.name] = `${field.label} is required.`;
  });
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Enter an email address in the form name@example.org.';
  }
  if (values.attendees.trim() && !(Number(values.attendees) >= 1)) {
    errors.attendees = 'Enter the number of people you expect (1 or more).';
  }
  if (!values.details.trim()) errors.details = 'Tell us a little about the program you need.';
  return errors;
}

export default function RequestProgram() {
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [support, setSupport] = useState([]);
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);
  const guard = useSpamGuard();

  const setField = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (showErrors) setErrors(validate(next));
      return next;
    });
  };

  const toggleSupport = (option) => {
    setSupport((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
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
      await submitForm({ type: 'request', ...values, support, ...guard.fields() });
      setStatus('success');
    } catch (error) {
      // The on-page copy stays generic and friendly for visitors; the real
      // cause (e.g. a misconfigured or missing GOOGLE_SCRIPT_URL) still needs
      // to be discoverable by whoever is checking the console, rather than
      // silently indistinguishable from a real network blip.
      console.error('TechBridge request form submission failed:', error);
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setSupport([]);
    setErrors({});
    setShowErrors(false);
    setStatus('idle');
    guard.restart();
  };

  const errorFor = (name) => (showErrors ? errors[name] : undefined);
  const errorCount = Object.keys(errors).length;

  return (
    <section className="section request" id="request">
      <div className="request-copy">
        <Eyebrow className="eyebrow-on-accent">{requestProgram.eyebrow}</Eyebrow>
        <h2 className="display">
          {requestProgram.heading.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h2>
        <p>{requestProgram.body}</p>
        <hr />
        <a className="request-email" href={`mailto:${site.contactEmail}`}>
          {site.contactEmail}
        </a>
        <ul className="request-social">
          {site.social.map((item) => (
            <li key={item.label}>
              {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="request-card">
        {status === 'success' ? (
          <div className="form-success" role="status">
            <span className="form-success-mark" aria-hidden="true">
              ✓
            </span>
            <h3>Request received</h3>
            <p>
              Thank you. The TechBridge committee reviews requests twice a month and will follow up by
              email.
            </p>
            <button type="button" className="btn btn-dark" onClick={reset}>
              Submit another request
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <Honeypot trapRef={guard.trapRef} />
            <div className="field-grid">
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
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      aria-invalid={message ? 'true' : undefined}
                      aria-describedby={message ? `${formId}-${field.name}-error` : undefined}
                      onChange={(event) => setField(field.name, event.target.value)}
                    />
                    {message ? (
                      <span className="field-error" id={`${formId}-${field.name}-error`}>
                        {message}
                      </span>
                    ) : null}
                  </p>
                );
              })}
            </div>

            <fieldset className="support">
              <legend>Support needed</legend>
              <div className="chips">
                {requestProgram.supportOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={support.includes(option) ? 'is-selected' : ''}
                    aria-pressed={support.includes(option)}
                    onClick={() => toggleSupport(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <p className="field">
              <label htmlFor={`${formId}-details`}>Tell us more</label>
              <textarea
                id={`${formId}-details`}
                name="details"
                rows="4"
                value={values.details}
                aria-invalid={errorFor('details') ? 'true' : undefined}
                aria-describedby={errorFor('details') ? `${formId}-details-error` : undefined}
                onChange={(event) => setField('details', event.target.value)}
              />
              {errorFor('details') ? (
                <span className="field-error" id={`${formId}-details-error`}>
                  {errorFor('details')}
                </span>
              ) : null}
            </p>

            <div aria-live="polite">
              {showErrors && errorCount > 0 ? (
                <p className="form-alert">
                  {errorCount} field{errorCount === 1 ? ' needs' : 's need'} attention before you can
                  send this request.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="form-alert">
                  Something went wrong sending your request. Please try again, or email{' '}
                  {site.contactEmail}.
                </p>
              ) : null}
            </div>

            <button type="submit" className="btn btn-dark btn-block" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : requestProgram.submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
