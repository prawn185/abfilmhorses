<?php namespace Sysflow\Validators;

use Netmatters\Base\Validators\BaseValidator;

/**
 * Class EnquiryValidator
 *
 * @package Netmatters\Enquiry\Validators
 */
class EnquiryValidator extends BaseValidator
{
    /**
     * Should we validate the Captcha field
     *
     * @var bool
     */
    protected $captcha = true;

    /**
     * Validation rules
     *
     * @var array
     */
    protected $rules = [
        'name'      => 'required',
        'telephone' => 'required|phone',
        'email'     => 'required|email',
        'subject'   => 'required',
        'message'   => 'required|min:5',
        'robot'     => 'max:0',
    ];

    /**
     * Validation messages
     *
     * @var array
     */
    protected $messages = [
        'telephone.phone' => 'Telephone number is invalid'
    ];


    /**
     * Enable the captcha validation
     *
     * @return $this
     */
    public function captcha()
    {
        $this->captcha = true;

        return $this;
    }


    /**
     * Disable the captcha validation
     *
     * @return $this
     */
    public function noCaptcha()
    {
        $this->captcha = false;

        return $this;
    }


    /**
     * Get the validation rules
     *
     * @return array
     */
    public function getValidationRules()
    {
        if ($this->captcha) {
            $this->rules['captcha'] = 'required|captcha';
        }

        return $this->rules;
    }
}
