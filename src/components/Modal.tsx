import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleArticle } from '../utils/apiUtils';
import { singleArticle } from '../types';
import { ClipLoader } from "react-spinners";

export default function Modal() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null)
  const [article, setArticle] = useState<singleArticle>();
  const [loading, setLoading] = useState<boolean>(true)

  const params = useParams();

  useEffect(() => {
    try {
      console.log("Fetching Article")
      fetchSingleArticle(params.id ?? "")
        .then(res => { setArticle(res); setLoading(false) })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { setOpen(false); navigate(-1) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0D1117] bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {
                loading ?
                  <div className="w-full my-36 flex items-center justify-center">
                    <ClipLoader
                      color={'#ffffff'}
                      loading={loading}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                  :
                  <Dialog.Panel className="relative bg-black border w-full border-gray-700 transform overflow-hidden pr-4 rounded-xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                    <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex  sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <img className="items-center object-cover h-72 w-full pb-2 rounded-xl" src={article?.thumbnail} alt="Thumbnail" />
                          <Dialog.Title as="h3" className="text-base font-bold mt-2 leading-6 text-gray-300">
                            {article?.title}
                          </Dialog.Title>
                          <div className="mt-1">
                            <p className="text-sm text-gray-500">
                              {article?.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
              }
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}