import { useParams } from "react-router-dom";

function VerifyEmail() {
  const { token } = useParams();
  return <div>Verify Email</div>;
}

export default VerifyEmail;
