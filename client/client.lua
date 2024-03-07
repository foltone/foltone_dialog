local dialogCallbacks = {}

exports("FoltoneDialog", function(title, description, callback)
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "openDialog",
        title = title,
        description = description
    })
    dialogCallbacks[title] = callback
end)

RegisterNUICallback("sendDialog", function(data, cb)
    SetNuiFocus(false, false)
    local title = data.title
    local result = data.result
    if dialogCallbacks[title] then
        dialogCallbacks[title](result)
    end
    cb("ok")
end)

RegisterCommand("test", function()
    exports["foltone_dialog"]:FoltoneDialog("Test", "Enter message", function(result)
        print(result)
    end)
end, false)
