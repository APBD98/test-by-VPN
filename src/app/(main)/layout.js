import Header from "@/components/header/header"
export default function Layout({ children }) {
    return (
      <html lang="en">
        <body className={`bg-blue-950 text-white`}>
            <Header/>
            {children}
        </body>
      </html>
    )
  }