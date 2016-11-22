<?php

use Sysflow\Validators\EnquiryValidator;
use Netmatters\Enquiry\Validators\CallbackValidator;

/**
 * Class EnquiryController
 *
 * @package Netmatters\Enquiry
 */
class EnquiryController extends \Netmatters\Enquiry\EnquiryController
{

    public function __construct(EnquiryValidator $enquiryValidator, CallbackValidator $callbackValidator)
    {
        $this->validator = $enquiryValidator;
        $this->callbackValidator = $callbackValidator;

        // Set email here so it can be overridden for each enquiry type
        $this->emails = Config::get('enquiry::main.email_to');
    }


    /**
     * Post the callback form
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postCallback()
    {
        $this->callbackValidator->noCaptcha()->validate(
            $this->inputs = Input::all()
        );

        return $this->submitEnquiry(1);
    }

    /**
     * Post the enquiry form
     *
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function postEnquiry()
    {
        $this->validator->noCaptcha()->validate(
            $this->inputs = Input::all()
        );

        return $this->submitEnquiry(2);
    }

}
