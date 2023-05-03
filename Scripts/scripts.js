/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */

import { TABLES, COLUMNS, state, createOrderData,updateDragging } from "./data.js";
import { createOrderHtml, html, updateDraggingHtml, moveToColumn } from "./view.js";

const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}


const handleDragStart = (event) => {

}

const handleDragEnd = (event) => {

}

const handleHelpToggle = (event) => {
    const {target} = event;

    if (target == html.other.help) {
        html.help.overlay.showModel()
    }
    if (target == html.help.cancel) {
        html.help.overlay.close()
    }
}

const handleAddToggle = (event) => {
    const {target} = event;

    if (target == html.add) {
        html.add.overlay.showModel()
    }
    if (target == html.add) {
        html.add.overlay.close()
    }
}
const handleAddSubmit = (event) => {

}
const handleEditToggle = (event) => {
    const {target} = event;
    const clickEdit = document.querySelector('.order')

    if (target == clickEdit) {
        html.edit.overlay.showModel();
    }
    if (target == clickEdit) {
        html.edit.overlay.close();
    }
}
const handleEditSubmit = (event) => {

}
const handleDelete = (event) => {
    const {target} = event;

    if (target == html.edit.delete) {
        document.querySelector('.order').remove();
    }
    if (target == html.edit.delete) {
        document.querySelector('.order').close()
    }
}

html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}