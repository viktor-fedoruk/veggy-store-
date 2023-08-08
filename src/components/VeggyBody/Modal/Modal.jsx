export default function ModalProductItemImage({modalActive, setModalActive, children}) {
    return (
        <div
            onClick={() => setModalActive(false)}
            className='modalWatchProductContainer'>
            <div
                className='modalWatchProductRow'>
                    {children}
            </div>
        </div>
    )
}

