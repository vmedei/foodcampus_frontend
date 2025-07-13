interface WrapperProps {
    children: React.ReactNode
}

function Wrapper({ children }: WrapperProps) {
    return (
        <main className="flex-1 overflow-auto">
            {children}
        </main>
    )
}

export default Wrapper