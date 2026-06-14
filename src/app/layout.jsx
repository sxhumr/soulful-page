export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#fdfbf7" }}>
        {children}
      </body>
    </html>
  );
}