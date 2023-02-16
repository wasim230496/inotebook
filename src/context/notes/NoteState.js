import React, { useState } from "react";
import NoteContext  from "./noteContext";
const NoteState = (props)=>{
const Initialnotes = [
    {
        "_id": "63ee7eee1d00af2f56b8ae09",
        "user": "63ebc2dea89b97a0bac35ec0",
        "title": "programing note",
        "description": "learn program as fast as possible",
        "tag": "programming reminder ",
        "date": "2023-02-16T19:07:26.248Z",
        "__v": 0
      },
      {
        "_id": "63ee7ef01d00af2f56b8ae0b",
        "user": "63ebc2dea89b97a0bac35ec0",
        "title": "programing note",
        "description": "learn program as fast as possible",
        "tag": "programming reminder ",
        "date": "2023-02-16T19:07:28.854Z",
        "__v": 0
      }
      ,
      {
        "_id": "63ee7ef01d00af2f56b8ae0b",
        "user": "63ebc2dea89b97a0bac35ec0",
        "title": "programing note",
        "description": "learn program as fast as possible",
        "tag": "programming reminder ",
        "date": "2023-02-16T19:07:28.854Z",
        "__v": 0
      },
      {
        "_id": "63ee7ef01d00af2f56b8ae0b",
        "user": "63ebc2dea89b97a0bac35ec0",
        "title": "programing note",
        "description": "learn program as fast as possible",
        "tag": "programming reminder ",
        "date": "2023-02-16T19:07:28.854Z",
        "__v": 0
      },
      {
        "_id": "63ee7ef01d00af2f56b8ae0b",
        "user": "63ebc2dea89b97a0bac35ec0",
        "title": "programing note",
        "description": "learn program as fast as possible",
        "tag": "programming reminder ",
        "date": "2023-02-16T19:07:28.854Z",
        "__v": 0
      },
      {
        "_id": "63ee7ef01d00af2f56b8ae0b",
        "user": "63ebc2dea89b97a0bac35ec0",
        "title": "programing note",
        "description": "learn program as fast as possible",
        "tag": "programming reminder ",
        "date": "2023-02-16T19:07:28.854Z",
        "__v": 0
      },
]
const [notes,setnotes]=useState(Initialnotes)

return(
    <NoteContext.Provider value={{notes,setnotes}}>
        {props.children}
    </NoteContext.Provider>
)
}
export  default NoteState;