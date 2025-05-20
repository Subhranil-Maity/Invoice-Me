export default function CircularLoader({size = 40, className = "",}: {
    size?: number
    className?: string
}) {
    const borderSize = Math.floor(size * 0.1)

    return (
        <div
            className={`inline-block animate-spin rounded-full border-t-primary border-r-muted border-b-muted border-l-muted ${className}`}
            style={{
                width: size,
                height: size,
                borderWidth: borderSize,
            }}
        />
    )
}