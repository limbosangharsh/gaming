import s from "./ReferralBlock.module.css";
import { useState  } from "react";

const ReferralBlock = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "VAULT-XK92";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={s.referral_wrap}>
      <div className={s.referral_left}>
        <span className={s.referral_icon}>🎁</span>
        <h4 className={s.referral_title}>Give $10, Get $10</h4>
      </div>

      <div className={s.referral_divider} />

      <p className={s.referral_desc}>
        Invite a friend, you both get $10.
      </p>

      <div className={s.referral_divider} />

      <div className={s.referral_code_row}>
        <span className={s.referral_code}>{referralCode}</span>
        <button className={s.referral_copy_btn} onClick={handleCopy}>
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
      </div>
    </div>
  );
};

export default ReferralBlock;