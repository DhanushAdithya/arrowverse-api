module Sidebar exposing (..)

import Html exposing (Html, a, br, div, h1, text)
import Html.Attributes exposing (class, href)



-- import Html.Events exposing (..)


sidebar : Html String
sidebar =
    div [ class "sidebar" ]
        [ h1 [] [ text "Routes" ]
        , div [ class "route_cont" ]
            [ a [ href "https://arrowverse-api.vercel.app/api/characters" ] [ text "/characters" ]
            , br [] []
            , a [ href "https://arrowverse-api.vercel.app/api/families" ] [ text "/families" ]
            ]
        ]
