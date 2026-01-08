import { useState, useRef, useEffect } from "react";
import "./CustomDropdown.scss";

type Option = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export default function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select option",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={`custom-dropdown ${open ? 'custom-dropdown--open' : ''}`} ref={ref}>
      <div
        className="custom-dropdown__control"
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? selected.label : placeholder}
      </div>

      {open && (
        <div className="custom-dropdown__menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="custom-dropdown__item"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
