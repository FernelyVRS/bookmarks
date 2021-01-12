import LinkForm from './LinkForm'
import {useEffect, useState} from 'react'

import {db} from '../firebase'
import { toast } from 'react-toastify'


const Links = () =>{

    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    const addOrEdit = async (linkObject) =>{
        try {
          if (currentId === "") {
          await db.collection('link').doc().set(linkObject);
          toast('New link added', {
            type: 'success',
            autoclose: 2500
          })
          } else {
            await db.collection('link').doc(currentId).update(linkObject);
            toast('Linkk updated', {
                type: 'info',
                autoclose: 2500
            })
            setCurrentId('');
        }
        } catch (error) {
          console.error(error);
        }

    }

    const onDelete = async (id) =>{
        if (window.confirm("Are you sure you wamt to delte this link?")) {
            await db.collection('link').doc(id).delete();
            toast('Link deleted', {
              type: 'error',
              autoclose: 2500
            })
        }
    }

    const getLinks = async () => {
         db.collection('link').onSnapshot((querySnapshop) =>{
            const docs = [];
            querySnapshop.forEach(doc =>{
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs);
        });
        
    }

    useEffect(() => {
        getLinks();
    }, []);

    return (
    <div className="h-screen bg-gray-900" >
        
        <LinkForm {...{addOrEdit, currentId, links}} />

        <div className=" bg-gray-900 py-6 mx-auto  " >
        <div>
          <h1 className="text-2xl text-center font-black text-white pb-6 px-6 md:px-12">LINKS</h1>
        </div>
        <div className="flex flex-auto flex-wrap px-2">
            {links.map((link) =>(
                <div className="w-full lg:w-1/3 md:px-4 lg:px-6 py-5" key={link.id} >
            <div className=" bg-gray-800 rounded-xl shadow-lg ">    
              <div className="px-4 py-4 md:px-10">
                <div className="flex">
                  <div className="flex-1">
                    <h1 className="font-bold text-lg text-gray-200">{link.webname}</h1>
                  </div>
                  <div className="mx-1">
                    <i className="material-icons text-blue-50 hover:text-blue-800 cursor-pointer" 
                        onClick={() => setCurrentId(link.id)}>edit</i>
                  </div>
                  <div className="mx-1">
                    <i className="material-icons text-blue-50 hover:text-red-800 cursor-pointer"
                        onClick={() => onDelete(link.id)}>delete</i>                  
                  </div>
                </div>   
                <p className="py-4 text-gray-50">{link.description}</p>
                <div className="flex flex-wrap pt-3">
                  <div className="w-full md:w-1/3 text-sm font-medium">
                    <a href={link.url} target="_blank" rel="noreferrer" className="text-green-600 px-1">Go to Website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ))}
        </div>
      </div>
    </div>
    )
}

export default Links;