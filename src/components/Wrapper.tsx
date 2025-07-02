interface WrapperProps {
    children: React.ReactNode
}

function Wrapper({ children }: WrapperProps) {
    return (
        <main className="container mx-auto px-6 py-10">
            {children}
        </main>
    )
}


export default Wrapper