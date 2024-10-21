//{ displayFullNotes, setDisplayFullNotes }
function NoteViewer(props) {
    const DisplayValue = props;
    const { noteTitle, noteContent } = DisplayValue.displayFullNotes;
    const { setDisplayFullNotes } = DisplayValue;

    return (
        <div className="mx-auto mt-10 w-full max-w-[1000px] p-4 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold mb-4 border-b border-slate-950">{noteTitle}</h1>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: noteContent }}
            />
            <div className="flex justify-between mx-10">
                <button className="bg-red-500 text-white p-1 rounded-lg mt-5" onClick={() => setDisplayFullNotes((prev) => ({ ...prev, display: false }))}>Close</button>
                <button className="bg-blue-500 text-white p-1 rounded-lg mt-5" onClick={() => window.location.reload()}>Edit</button>
            </div>
        </div >
    );
}

export default NoteViewer;