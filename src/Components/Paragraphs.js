import React from 'react'
const ParagraphsGenerator = () => {

    const paragraphs = [
        "test1","test2","test3","test4"]


        const random = Math.floor(Math.random() * paragraphs.length)
    return (
        <div>
            <p>
                {paragraphs[random]}
            </p>
        </div>
    )
}

export default ParagraphsGenerator ; 