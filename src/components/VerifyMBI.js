import { useState } from 'react'

const VerifyMBI = ({host}) => {

    const [verifyMBI, setVerifyMBI] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [err, setErr] = useState(null)
    const [isValid, setIsValid] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsValid('')

        if (!verifyMBI){
            setErr('Please enter an MBI to verify...')
        }
        else {
            setIsPending(true)
            setErr(null)

            const url = `${host}/verify`
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        mbi: verifyMBI
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()

                if (!response.ok){
                    console.log(json)
                    throw Error('Error attempting to post verfication.  See console log.')
                }
                setIsValid(json.valid)
            }
            catch (error){
                setErr(error.toString())
            }
            finally {
                setIsPending(false)
            }            
        }
       


    }


    return (

    <div className="verify-mbi">
        <div className="row">
            <p>Verify an existing Medicare Beneficiary Identifier</p>
        </div>
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-auto">
                <input type="text" className="form-control" id="verify-mbi" placeholder="enter MBI" value={verifyMBI} onChange={ e => setVerifyMBI(e.target.value)} />
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary" disabled={isPending}>Verify</button>
            </div>
        </form>
        <div className="row pt-3">
            <div className="col">
                { err && <div className="error alert alert-danger" role="alert">{err}</div> }  
                { isValid === "true" &&
                    <div className="result alert alert-success" role="alert">MBI is valid</div> 
                }
                { isValid === "false" &&
                    <div className="result alert alert-danger" role="alert">MBI is NOT valid.  Please try again...</div> 
                }
            </div>
        </div>

    </div>



      );
}
 
export default VerifyMBI;