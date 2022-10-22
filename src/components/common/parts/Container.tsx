type Props = React.HTMLAttributes<HTMLDivElement> & {
  fullWidth?: boolean;
  children: React.ReactNode;
};

const Container = (props: Props): JSX.Element => {
  const {
    fullWidth = false,
    children,
    className = "",
    ...divHTMLAttributes
  } = props;

  return (
    <div
      {...divHTMLAttributes}
      className={`px-4 md:px-8 ${
        fullWidth ? "" : "mx-auto max-w-6xl"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
