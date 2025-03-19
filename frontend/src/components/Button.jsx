const Button = ({text, color}) => {
    return (
        <button
            className="w-full py-1 rounded-full text-green-800 text-lg font-bold hover:bg-green-600 transition"
            style={{
                background: 'linear-gradient(150deg, #5672B8, #040B29DB)',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                color: color ? color : '#1F2937'
            }}
        >
            {text}
        </button>
    )
}

export default Button
