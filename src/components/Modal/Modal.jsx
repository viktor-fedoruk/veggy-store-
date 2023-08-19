export default function Modal({ setIsModalActive, children }) {
    return (
        <div
            onClick={() => setIsModalActive(false)}
            className="modalWatchProductContainer"
        >
            <div className="modalWatchProductRow">{children}</div>
        </div>
    )
}

