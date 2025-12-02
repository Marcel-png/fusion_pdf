'use client'

import { useState } from "react"
import { PDFDocument } from "pdf-lib"

export default function App() {
  const [name, setName] = useState("")
  const [show, setShow] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setShow(`Bienvenue ${name} !!`)
  }

  async function handleMerge() {
    if (files.length <= 1) {
      alert(" Vous devez selectionner au moins deux fichiers pdf.")
      return
    }

    setLoading(true)

    const mergedPdf = await PDFDocument.create()

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach((page) => mergedPdf.addPage(page))
    }

    const arrayBuffer = mergedBytes.slice().buffer
    const blob = new Blob([mergedBytes], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${name}.pdf`
    a.click()

    setLoading(false)
  }

  const buttonClass =
    "mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-red-300 " +
    "hover:from-red-300 hover:to-blue-500 text-white font-bold " +
    "rounded-full cursor-pointer shadow-lg shadow-blue-700 hover:shadow-transparent " +
    "transition duration-500"

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 lg:p-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col gap-4"
      >
        {show ? (
          <div className="flex flex-col items-center text-center p-4 border border-blue-300 rounded-xl bg-white/20">
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-700 via-orange-500 to-red-700 bg-clip-text">
              {show}
            </span>
            <span className="mt-2 text-sm text-gray-500 max-w-md">
              Cette application vous permet de rassembler facilement plusieurs fichiers PDF en un seul document. 
              L’utilisation est très simple : il vous suffit de sélectionner les fichiers que vous souhaitez combiner, 
              puis de lancer la fusion en appuyant sur le bouton <strong>"Sélectionner & Fusionner"</strong>.
            </span>
          
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={(e) => {
                const selectedFiles = e.target.files ? Array.from(e.target.files) : []
                setFiles(selectedFiles)
              }}
              className="mt-4 mb-2 bg-red-700/20 p-2 rounded border border-blue-500 cursor-pointer"
            />

            <button type="button" onClick={handleMerge} className={buttonClass}>
              {loading ? "Fusion en cours..." : "Sélectionner & Fusionner"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="text-center text-lg font-semibold">
              Entrez votre nom et ou prénom ci-dessous
            </label>

            <input
              type="text"
              id="name"
              placeholder="Votre nom ici..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-blue-500 rounded p-2 w-full text-lg capitalize"
            />

            <button type="submit" className={buttonClass}>
              Cliquez ici pour commencer
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
