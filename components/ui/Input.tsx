type InputProps = {
    field: any;
    form: any;
    type?: string;
    placeholder?: string;
  };
  
  export default function Input({
    field,
    form,
    ...props
  }: InputProps) {
    const { name } = field;
    const { errors, touched } = form;
  
    return (
      <div className="w-full">
        <input
          {...field}      // value, onChange, onBlur
          {...props}     // ✅ placeholder, type, etc.
          className="
  w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
 text-black
  focus:outline-none focus:ring-2 focus:ring-orange-400
"
        />
  
        {touched[name] && errors[name] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[name]}
          </p>
        )}
      </div>
    );
  }
  