export const metadata = {
  title: "Login",
  description: "Generated by create next app",
};

export default function loginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}