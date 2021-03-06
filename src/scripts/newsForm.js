import APICollection from "./apiCollection"
import ElementBuilder from "./elementBuilder"
import NewsList from "./newsList"
import DomManager from "./domManager"

export default class NewsForm {
    static buildNewsForm(form_action) {
        let formDefinition = {
            "element_type": "form",
            "attribute_descriptions": [
                {
                    "attribute_name": "action",
                    "attribute_value": ""
                },
                {
                    "attribute_name": "id",
                    "attribute_value": "new_article_form"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": "new_article_form submit_state"
                }
            ]
        }

        let fieldsetTitleDefinition = {
            "element_type": "fieldset",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "new_article_title"
                }
            ]
        }

        let labelTitleDefinition = {
            "element_type": "label",
            "text_content": "Title",
            "attribute_descriptions": [
                {
                    "attribute_name": "for",
                    "attribute_value": "article_title"
                }
            ]
        }

        let inputTitleDefinition = {
            "element_type": "input",
            "attribute_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": "article_title"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": "article_title"
                },
                {
                    "attribute_name": "type",
                    "attribute_value": "text"
                }
            ]
        }

        let fieldsetURLDefinition = {
            "element_type": "fieldset",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "new_article_url"
                }
            ]
        }

        let labelURLDefinition = {
            "element_type": "label",
            "text_content": "URL",
            "attribute_descriptions": [
                {
                    "attribute_name": "for",
                    "attribute_value": "article_url"
                }
            ]
        }

        let inputURLDefinition = {
            "element_type": "input",
            "attribute_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": "article_url"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": "article_url"
                },
                {
                    "attribute_name": "type",
                    "attribute_value": "url"
                }
            ]
        }

        let fieldsetSynopsisDefinition = {
            "element_type": "fieldset",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "new_article_synopsis"
                }
            ]
        }

        let labelSynopsisDefinition = {
            "element_type": "label",
            "text_content": "Synopsis",
            "attribute_descriptions": [
                {
                    "attribute_name": "for",
                    "attribute_value": "article_synopsis"
                }
            ]
        }

        let inputSynopsisDefinition = {
            "element_type": "input",
            "attribute_descriptions": [
                {
                    "attribute_name": "id",
                    "attribute_value": "article_synopsis"
                },
                {
                    "attribute_name": "class",
                    "attribute_value": "article_synopsis"
                },
                {
                    "attribute_name": "type",
                    "attribute_value": "text"
                }
            ]
        }

        let submitButtonDefinition = {
            "element_type": "button",
            "text_content": "Save Article",
            "attribute_descriptions": [
                {
                    "attribute_name": "class",
                    "attribute_value": "btn submit_article"
                }
            ]
        }

        let newsForm = ElementBuilder.buildHTMLElement(formDefinition.element_type, formDefinition.attribute_descriptions)
        let titleFieldset = ElementBuilder.buildHTMLElement(fieldsetTitleDefinition.element_type, fieldsetTitleDefinition.attribute_descriptions)
        let titleLabel = ElementBuilder.buildHTMLElement(labelTitleDefinition.element_type, labelTitleDefinition.attribute_descriptions, labelTitleDefinition.text_content)
        let titleInput = ElementBuilder.buildHTMLElement(inputTitleDefinition.element_type, inputTitleDefinition.attribute_descriptions)
        let urlFieldset = ElementBuilder.buildHTMLElement(fieldsetURLDefinition.element_type, fieldsetURLDefinition.attribute_descriptions)
        let urlLabel = ElementBuilder.buildHTMLElement(labelURLDefinition.element_type, labelURLDefinition.attribute_descriptions, labelURLDefinition.text_content)
        let urlInput = ElementBuilder.buildHTMLElement(inputURLDefinition.element_type, inputURLDefinition.attribute_descriptions)
        let synopsisFieldset = ElementBuilder.buildHTMLElement(fieldsetSynopsisDefinition.element_type, fieldsetSynopsisDefinition.attribute_descriptions)
        let synopsisLabel = ElementBuilder.buildHTMLElement(labelSynopsisDefinition.element_type, labelSynopsisDefinition.attribute_descriptions, labelSynopsisDefinition.text_content)
        let synopsisInput = ElementBuilder.buildHTMLElement(inputSynopsisDefinition.element_type, inputSynopsisDefinition.attribute_descriptions)
        let submitButton = ElementBuilder.buildHTMLElement(submitButtonDefinition.element_type, submitButtonDefinition.attribute_descriptions, submitButtonDefinition.text_content)
        titleFieldset.appendChild(titleLabel)
        titleFieldset.appendChild(titleInput)
        urlFieldset.appendChild(urlLabel)
        urlFieldset.appendChild(urlInput)
        synopsisFieldset.appendChild(synopsisLabel)
        synopsisFieldset.appendChild(synopsisInput)
        
        newsForm.appendChild(titleFieldset)
        newsForm.appendChild(urlFieldset)
        newsForm.appendChild(synopsisFieldset)
        newsForm.appendChild(submitButton)
        
        submitButton.addEventListener("click", (event) => {
            event.preventDefault()
            const newArticleTitle = document.querySelector("#article_title").value
            const newArticleURL = document.querySelector("#article_url").value
            const newArticleSynopsis = document.querySelector("#article_synopsis").value
            const newDate = new Date()
            const newDateMonth = newDate.getMonth()+1
            const newDateDay = newDate.getDate()
            const newDateYear = newDate.getFullYear()

            const new_article = {
                title: newArticleTitle,
                url: newArticleURL,
                synopsis: newArticleSynopsis,
                date: `${newDateMonth}/${newDateDay}/${newDateYear}`,
                userId: sessionStorage.getItem("username")
            }

            APICollection.postAPI("http://localhost:8088/news", new_article).then(() => {
                document.querySelector("#news_output").innerHTML = ""
                document.querySelector("#article_title").value = ""
                document.querySelector("#article_url").value = ""
                document.querySelector("#article_synopsis").value = ""
                let get_news_list = NewsList.buildNewsList()             
                DomManager.elementAppender(get_news_list, "#news_output")
            })
        })

        return newsForm
    }
}