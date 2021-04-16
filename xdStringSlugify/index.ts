'use strict' // 2021-01-25 18.12

/**
- converts the string to lower case
- substitutions defined in the `submap` are applied
- characters in `a-z0-9` range are left as is (unless redefined in `submap`)
- all the other characters are replaced with dashes
- repeating dashes are replaced with single dashes
- leading and trailing dashes are removed
@example
xdStringSlugify('Foo Bar Baz') // foo-bar-baz
xdStringSlugify('神奈川 / Foo / Bar / Baz 沖浪裏') // foo-bar-baz
xdStringSlugify('Foo Bar Баз', { а: 'a', б: 'b', з: 'z' }) // foo-bar-baz
*/

export function xdStringSlugify (string:string, submap:{ [replacee:string]:string } = {})
{
    let slug = ''

    for (const char of string.toLowerCase())
    {
        if (submap[char])
        {
            slug += submap[char]
        }
        else if (/[a-z0-9]/.test(char))
        {
            slug += char
        }
        else
        {
            slug += '-'
        }
    }

    return slug.replace(/-{2,}/g, '-').replace(/^-/, '').replace(/-$/, '')
}