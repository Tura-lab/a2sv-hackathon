import React from 'react'
import style from './InputPdfLink.module.css'



export default function InputPdfLink({ setPdfLink }) {


    return (
        <form className={style.topLeftContainer} onSubmit={(e) => {
            e.preventDefault(); // Prevent the form from submitting
            const pdfLinkValue = e.target.elements.pdfLink.value;

            setPdfLink(pdfLinkValue)
            console.log(`set pdf link to ${pdfLinkValue}`)

        }}>
            <label htmlFor='pdf-link'></label>
            <input name='pdfLink' className={style.input} id='pdf-link' placeholder='enter the link to pdf'></input>
            <button className={style.button}>Train</button>
        </form>
    )
}
