# Arrowverse API

## Endpoints
### `/api/characters`

### `/api/families`

## Characters
```js
{
    name: String,
    also: [String],
    species: String,
    status: String,
    currentUniverse: String,
    occupation: [String] || {
        originalMultiverse: [String],
        newMultiverse: [String]
    },
    affiliation: [String] || {
        originalMultiverse: [String],
        newMultiverse: [String]
    },
    family: [String],
    alterEgo: [String],
    codeName: [String],
    actor: [String],
    imgUrl: String
}
```
## Families
```js
{
    name: String,
    species: [String],
    headOfTheFamily: [String],
    home: [String] || {
        originalMultiverse: [String],
        newMultiverse: [String]
    },
    goal: [String] || {
        originalMultiverse: [String],
        newMultiverse: [String]
    },
    imgUrl: String
}
```