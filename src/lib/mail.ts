import { Resend } from 'resend';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendTwoFactorEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your 2FA Code – Secure Your Account',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0e0e10; color: #e3e3e3; padding: 20px;">
        <h2 style="color: #00ff99;">Two-Factor Authentication</h2>
        <p>Hey gamer, here’s your security code:</p>
        <p style="font-size: 24px; font-weight: bold; background-color: #1f1f1f; padding: 10px 20px; display: inline-block; border-radius: 5px; color: #00ff99;">${token}</p>
        <p>If you didn’t request this, you can ignore it. Stay sharp 💪</p>
        <p>– The Squad</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset Your Password – Get Back In The Game',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0e0e10; color: #e3e3e3; padding: 20px;">
        <h2 style="color: #ff4d4d;">Password Reset Request</h2>
        <p>Looks like you forgot your password. No worries, it happens even to pros.</p>
        <p>Click the button below to reset it and jump back into the game:</p>
        <p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #ff4d4d; color: #fff; text-decoration: none; border-radius: 5px;">Reset My Password</a>
        </p>
        <p>If you didn’t request this, just ignore it. Your account is safe.</p>
        <p>Stay frosty,<br>The Team</p>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirmation?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify Your Email – Let’s Go!',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0e0e10; color: #e3e3e3; padding: 20px;">
        <h2 style="color: #00aaff;">Welcome to the Squad!</h2>
        <p>You’re almost in. Just one last step:</p>
        <p>Click the button below to confirm your email and activate your account:</p>
        <p>
          <a href="${confirmLink}" style="display: inline-block; padding: 12px 24px; background-color: #00aaff; color: #fff; text-decoration: none; border-radius: 5px;">Confirm My Email</a>
        </p>
        <p>If you didn’t request this, no action needed.</p>
        <p>Game on,<br>The Team</p>
      </div>
    `,
  });
};
