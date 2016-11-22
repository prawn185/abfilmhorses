<?php

class NmNews extends Netmatters\Base\BaseModel
{

    /*
     *---------------------------------------------------------------
     * CLASS PROPERTIES
     *---------------------------------------------------------------
     */
    protected $connection       = 'netmatters';
    protected $table            = 'news';
    protected $primaryKey       = 'newsid';

    public function image()
    {
        return $this->hasOne('NmImages', 'newsid', 'newsid');
    }

    public function images()
    {
        return $this->hasMany('NmImages', 'newsid', 'newsid');
    }

}
