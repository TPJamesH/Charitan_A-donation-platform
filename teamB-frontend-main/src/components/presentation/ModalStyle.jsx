const ModalStyle = () => {
    const defaultButtonLabel = "Search";
    const defaultButtonClass = "text-white text-sm bg-yellow-700 rounded items-center justify-center px-4 w-au h-10";
    const defaultModalClass = "relative z-10 focus:outline-none";
    const defaultPanelClass = "w-full max-w-md rounded-xl bg-black/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0";
    const defaultTitleClass = "text-2xl font-heavy text-black pb-6";

    return {
        defaultButtonLabel,
        defaultButtonClass,
        defaultModalClass,
        defaultPanelClass,
        defaultTitleClass
    }
}

export default ModalStyle