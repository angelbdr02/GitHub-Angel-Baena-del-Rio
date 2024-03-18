"<?xml version='1.0' encoding='UTF-8'?>",
<consecionario_unico>
    {
    for $x in //coche
    return
    (
        <coche matricula="{$x/@matricula}">
        <marca>{$x/marca/text()}</marca>
        <modelo>{$x/marca/@modelo/data()}</modelo>
        <percio_iva tipo="21%">{$x/precio*1.12}</percio_iva>
        {$x/combustible}
        </coche>
    )
    }
</consecionario_unico>