import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // ✅ import

export default function VerificationEmailPage() {
  const [value, setValue] = useState("");
  const { verifyEmail, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate(); // ✅ initialize

  const handleSubmit = async () => {
    const result = await verifyEmail(value);
  
    if (result.success) {
      toast.success("Your email has been verified successfully", {
        description: "Email Verified",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error("Verification failed", {
        description: result.error,
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="space-y-4 flex flex-col w-full max-w-md px-4">
        <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
          <InputOTPGroup className="mx-auto">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <div className="text-center text-sm">
          {value === "" ? (
            <>Enter your verification email code.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>

        <Button
          className="bg-black text-white rounded-full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Email Now"}
        </Button>
      </div>
    </div>
  );
}

