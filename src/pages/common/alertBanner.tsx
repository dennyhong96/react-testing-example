import Alert from "react-bootstrap/Alert";

interface IAlertBannerProps {
  message?: string;
  variant?: string;
}

const AlertBanner = (props: IAlertBannerProps) => {
  const {
    message = "An unexpcted error ocurred. Please try again later.",
    variant = "error",
  } = props;

  return (
    <Alert variant={variant} style={{ backgroundColor: "red" }}>
      {message}
    </Alert>
  );
};

export default AlertBanner;
