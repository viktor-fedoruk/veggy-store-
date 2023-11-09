import * as React from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import "./Checkout.css"
import {useNavigate,} from "react-router-dom";
import { FC } from "react";

type Inputs = {
    fullName: string,
    phoneNumber: number,
    email: string,
}

const Checkout:FC<Inputs> = (props) => {
    const {
        register,
        setFocus,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
    } = useForm<Inputs>({mode: "onBlur"});

    React.useEffect(() => {
        setFocus("fullName");
    }, [setFocus]);

    const navigation = useNavigate();

    const oneStepBack = () => {
        navigation("/veggy-store-/");
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(JSON.stringify(data));
    }

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="form-header">
                    <h1 className="form-title">Client Details</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-label">
                        First name/Middle name/Last name:
                        <input className="form-input"
                               placeholder="Full Name"
                               {...register("fullName", {
                                   required: "Please enter your full name.",
                                   minLength: {
                                       value: 15,
                                       message: "Minimum 15 characters required!"
                                   },
                               })}
                        />

                        {errors?.fullName && <span className="error-paragraph">{errors?.fullName.message || errors}</span>}
                    </label>
                    <label className="form-label">
                        Phone number:
                        <input
                            className="form-input"
                            placeholder="+380"
                            {...register("phoneNumber", {
                                required: "Please enter your phone number in format: +380xxxxxxxxx.",
                                pattern: {
                                    value: /^[0-9+-]+$/,
                                    message: 'Please enter a valid phone number,',
                                },
                                minLength: {
                                    value: 13,
                                    message: "Minimum 13 characters required."
                                },
                            })}
                        />

                        {errors?.phoneNumber && <span className="error-paragraph">{errors?.phoneNumber.message || errors}</span>}
                    </label>
                    <label className="form-label">
                        Email:
                        <input
                            className="form-input"
                            placeholder="yourname@example.com"
                            {...register("email", {
                                required: "Please enter your email adress in format: yourname@example.com.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email',
                                },
                                minLength: {
                                    value: 6,
                                    message: "Email address should be at least 6 characters."
                                },
                            })}
                        />

                        {errors?.email && <span className="error-paragraph">{errors?.email.message || errors}</span>}
                    </label>

                    <div className="submit-wrapper">
                        <button
                            className="back-button btn-form"
                            onClick={oneStepBack}
                        >
                            Back
                        </button>
                        <button
                            className="submit-button btn-form"
                            type="submit"
                            disabled={!isValid}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout;