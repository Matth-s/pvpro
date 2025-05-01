import { Checkbox } from '@/components/ui/checkbox';

type ShowPasswordProps = {
  showPassword: boolean;
  setShowPassword: () => void;
  label: string;
};

const ShowPassword = ({
  setShowPassword,
  showPassword,
  label,
}: ShowPasswordProps) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <Checkbox
        id="password"
        onCheckedChange={setShowPassword}
        defaultChecked={showPassword}
        className="cursor-pointer"
      />
      <label
        htmlFor="password"
        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
      >
        {label}
      </label>
    </div>
  );
};

export default ShowPassword;
