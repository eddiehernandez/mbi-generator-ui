import { useState } from "react";


const GenerateMBI = ({host}) => {


    const [mbi, setMBI] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [err, setErr] = useState(null)

    const handleGenerate = async () => {
        setIsPending(true)
        setErr(null)

        //perform fetch of mbi and set it
        const url = `${host}/generate`
        try {
            const response = await fetch(url)
            const json = await response.json()

            if (!response.ok){
                console.log(json)
                throw Error('Error attempting to generate an MBI.  See console log for more details.')
            }
            setMBI(json?.mbi)

        }
        catch (error){
            setErr(error.message)
        }
        finally {
            setIsPending(false)
        }
    }

    return (
        <div className="generate-mbi">
            <div className="row">
                <div className="col-6">
                    <p>Generate Medicare Beneficiary Identifier</p>
                </div>
                <div className="col">
                    <button onClick={handleGenerate} disabled={isPending} className="btn btn-primary">Generate</button>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col">
                    {   
                        mbi &&
                        <div className="results alert alert-primary" role="alert">
                            Result: {mbi}
                        </div>
                    }  
                    { err && <div className="error alert alert-danger" role="alert">{err}</div> } 
                </div>
            </div>



        </div>
      );
}
 
export default GenerateMBI;