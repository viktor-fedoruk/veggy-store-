export default function Modal({ setModalActive, children }) {
    return (
        <div
            onClick={() => setModalActive(false)}
            className="modalWatchProductContainer"
        >
            <div className="modalWatchProductRow">{children}</div>
        </div>
    )
}

