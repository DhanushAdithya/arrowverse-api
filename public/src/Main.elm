module Main exposing (..)

import Browser
import Html exposing (Html, div, h1, text)
import Html.Attributes exposing (class)



-- import Html.Events


main : Program () String String
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }


init : String
init =
    "Arrowverse API"


update : String -> String -> String
update msg model =
    case msg of
        _ ->
            model


view : String -> Html String
view model =
    div []
        [ div [ class "header" ]
            [ h1 [ class "heading" ] [ text model ] ]
        ]
