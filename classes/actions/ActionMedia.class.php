<?php

class PluginMedia_ActionMedia extends ActionPlugin
{
    /**
     * Текущий пользователь
     *
     * @var ModuleUser_EntityUser|null
     */
    protected $oUserCurrent = null;
    
    /**
     * Инициализация
     *
     * @return string
     */
    public function Init()
    {
        
        $this->oUserCurrent = $this->User_GetUserCurrent();
        
        
    }

    /**
     * Регистрация евентов
     */
    protected function RegisterEvent()
    {
        
        $this->RegisterEventExternal('Media', 'PluginMedia_ActionMedia_EventMedia');
        $this->AddEventPreg( '/^upload$/', '/^$/', 'Media::EventUpload');
        $this->AddEventPreg( '/^load$/', '/^$/', 'Media::EventLoad');
        $this->AddEventPreg( '/^remove$/', '/^$/', 'Media::EventRemove');      
        $this->AddEventPreg( '/^form-insert$/', '/^$/', 'Media::EventFormInsert');
        $this->AddEventPreg( '/^get-data$/', '/^$/', 'Media::EventGetData');
        $this->AddEventPreg( '/^crop-image$/', '/^$/', 'Media::EventCropImage');
    }

    public function EventShutdown() {
        $this->Viewer_Assign('sMenuHeadItemSelect', $this->sMenuHeadItemSelect);
        $this->Viewer_Assign('oTest', $this->oTest);
    }

}