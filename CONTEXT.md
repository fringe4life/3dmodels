# 3D Models

A catalog of 3D-printable models. Listings are paged by exclusive cursor; public URLs name a model by slug.

## Language

**Model**:
A 3D-printable listing in the catalog.
_Avoid_: Product, item, van

**ModelId**:
The uuidv7 primary key of a Model. The listing cursor. Not in the public path.
_Avoid_: uuid, pk, row id

**ModelSlug**:
The unique public key of a Model. Path `/3d-models/{slug}`. Likes foreign key.
_Avoid_: id, handle, permalink

**ListingCursor**:
An exclusive ModelId bookmark for a listing page slice. URL `cursor`.
_Avoid_: page, offset, opaque token

**Direction**:
`forward` or `backward` seek from a ListingCursor.
_Avoid_: next, prev, navigation

**PageSlice**:
The visible window of Models on a listing. The view-transition wrapper. Not a URL param.
_Avoid_: page, offset page

**Page**:
Do not use for listings. The old 0-based offset index.
_Avoid_: page index, page number
