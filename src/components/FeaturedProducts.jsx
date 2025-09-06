import React from "react";
import {
  FaSearch,
  FaBars,
  FaShoppingCart,
  FaPlusCircle,
  FaSlidersH,
  FaTree,
  FaRulerVertical,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const products = [
  {
    name: "Stratocaster",
    model: "American Professional II",
    price: "$1,699",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAB4FBMVEX////w5trwIQHxIgLtIgHw6Nv7JQDt5tbt5NX5JALkHwDoIQD0JgH2JAHjHwDdHgH/HwBVOi5iSTzq38/HuavtnlNgQzT9+vhRNCeEY09qSzv9LwDu7N/4rJf+uazoy5X89O/olUbxw5rez8Ps5+DllkrajEDk2dDtmEXqoFhKKRlYNyaulYdqU0dxW090VkdvUkN9V0N3Y1ZsRDG5qZ93TjhqQSy9AABhSzz64NX7QRakiHFZNCPKDQDdw5r86uLu2bjj0rvIx8bS0c+bjojSuLHmrXnksYbhiSnjjDLux6e4sqvfmFnZo3TNrpLLgTqwcTyUYTl9cWryvI3Eo4jGtKPkpm3Eg0WwgVbeoGnPn3f74spnY17JkFvXkUzc3t2hm5eYcU70uoLHlWafgWv4sWu9hVG6lHEuKym8eDosJibPfTOPbldNPTSUf3U/GADNtpu+loP6lHzaUDL6XTH3gV39b0/anpbzdmP7xbX5nYTwZlHUgXfTU0D7wrPuOiDLXU/FMR68YlzneGX7k4LdQyTdoI+8e2fmTCK2OxrkZVLlUDr1rJG3oYL9RSrgxIfIrn7fjnz4elXWcl/x2am6hnO0QjSwU0bJraj7bD+Bgn5RRz+qAACwZFueVU6lbmmdUczFAAATQUlEQVR4nO2diV8ad/rH5Ri5D5kBHASEDgqGY7g0ikcQta3FJt00JE1JjO262u1S1hqjggZNo6atjZqGHJu03X/193y/MyBqtk1eP+kws/sxwQObPu8893cG09YmgPLvz85+IBPi//znyH79w4DXO/3hR0Ib0gx5GF9b2/vTXixJIvr9/jbPdIAj7PV6hLbn/OX3M9n3Zj7uBQHidF5oe85fPspn/4BKXv7HlU8+8fZ43xPanqbI80GmSPX2fvIXrzcgPUIf1Jl8X+jq5UDvFQjTacmVGg/D2Ns+ne69wlUa77TkWqIPSqnHOh3o6eEArwtt0LnLxzCZazdzl7lKGujzCG3Q+ctnb/sol8zeBsDA9HWP0Oacv+zw+zpVzN4ED/aQQlvTBPlgZPNM3yh85u25Ir0yCrKjke2j6UCgp7fnigRbIRAyfio7c/Mm1JmeXu+nQpvTDPlg6v6YSn6OCHul1yk45a8lk9egHUK7sAtty/nLDyPbpzduTd629oA+vCS0PecuHxrZAoHeWW8fAM5Op4U26NwFq+EEOe0N9HgB0DorwWLqY/x3Pv6AQnWmB+LU2ye0QecvKC3vUyHqNiK8sWCd9ght0DnL7oHtaXaumJwBD1p7PpsNSO0Ig4GRLT994wtUSb1W68JMQGJzG6yGvrYvAwFrn7X3r7c/W/jshvVLoW06X3lgZEv2ffB+T19fz+L8XwMLC1ar0Dads8CF+ctJ6uPZWVRKrbML1oD0ppr3cjlqsa8PAtVqvfGFNSCpqQaCtK3tbwu3hmc4wp6FG1ZpFVN8mg915m9WjnBhZmGhR1LFFJ3mf2SdsV7nCWdvWK3Sahc+xmd/n6I+n+mZQYRQaWb70lKrNPbPqVxupoevNIEvPUIbdO7Kz05OLtai1CvFFf+9wOztvuvWmVkr7Idej9DmNEFWL/jvuvWLv1h7vNK8rNYXgBycsQ4Oggeld0kGKe2d7uuZmf3qmyu9vbNCG9Mcqa/PXrn996+//vuVf9wU2pYmyVNIsMFvvgkmBopCm9IsFS9YLthGLoz886rQljRLJEMxSON+oS1plkIjUeTD4D8nhbakWQoFw52Wjg7bBUkTOiRPaPnmf4Ri1n9DlEY5Qsl2/JAtbmEHLeEO6RJG4+F4JBIZlGyUFmtRKtmprdgZ7ZA+oUXahBCliLBTwoRoLrXZLsSFtqRZgiiFSiNpQkvcEglHWYt0oxQIw2Epd/x5Pg87I0Jb0iTZ54Nsh03ShIUg2/k4BIRhoU1pkjDh8HCHxAltHR0WaRPCXNpxQbKExXAxEo9H4mGpdgsPPcKiuVS6PvTQ0C0sUs5DTOiw2Cydg1K7SYGXr05okSzhCCZ0SJqwEwhtkiX0FCzxMO4WcYkS1nwo7SjtcNgQoUdoW5ojIKQ7Lz9GhD6hbWmOMOHwPOoWEiZEUWrpdEiWMEjb2Kgl3BmVKmHBUkBXZuKDcYkS+iFKg3hqk2qU3gFCW8wBtdRxR2hbmiPkQxsrecKowxYN2iRLCLU0agFCi1QJC4NQS+No9pZopWFwLYW5dES6UQqE8wVEOCG0Lc0R9uHSNZsjKFXCDCKMoVqakCghU7DRNjoaZW0OqRLSlsIgHQnHLRGJVhqK7pR4lCJCm+QJkQ9jEiaEWgpzqUOyhAwd5s9LIxIlTNJBNuFA29NARmhbmqNkLMgG5+dRpZEs4QA7AlMbK2HCYDToiEnYh1RE8pUmZmNt0ZiDdTgooW1pjoAwanMAYcKWFdqW5igZS7AcoUOihKGYg/PhQEKihEk2AmUGxMYlShjq53wYTSSSQtvSHE32x2JA2M/290uZMCZlwlCMjkVplqVjMakSsvFoOBKJRgZZiRJClBYSEKWFAalG6WQ/nY/FYvN56eZhf4yGYtNPD/RL4gWIZ297QnnIoo4flkYe3vn29M+GKPbHEo5+NhZN9IcEMelc5blELp7GKPbTQBiTBKF9OWW8e/n0V4sJesDW74ixiYTYCT0rXamUcvR0Joai9GAkEqfjg1Gx5+E9INTvm6ZOfbnooIOO/miM7RC7D93l1XazYX1/7dTXIUoTiDAWHBA3oedepcvcfpbQPg956OiHWiN2wpJ7x9z+JsLhCLqtDd2LERY3YXloBRH+uHqasGADH9Iw1tiCon5ZkKdcgiBtV2ysbp58wl5AUbqUS4id8JLLBYDtmv2f7598wl5w0AOx/phD7IRDlWVMuLU8evIJezFSxIfe8XBY1JN3qbSOCeX3tMyJJ3CUxoLgw4S4fVgZWkWE7Yrd77dPPGGnJULo5gk1yq2TU419ni1EaYhSmo2KmrDmw3a9TvfA0/CEnbbRiSiLbsd4kw/xD8QWhWqEGo1Sa9xueIKJQT+MLS3ZIErP/mCMkslkXPX8WUb+v1Sq+bDdoNSZntfvJLVvQIzGaAfN0qzjjA8vKWEdMa+I4vVQQ6UaYbs+lTJefOZDZtv9G6l4R8TGdrCDrKPjzI/+eLK6v5XqWi4LYPA761JpgyfUaAypVMp08YfvNr+7K+/6ng7SA2wwZuvvPxuld3cOclP68j0x/Kx9T2W9RgiM4MZUSqdDj1vFaAFFaeRNtVRZTpHOh6uuihAmv6M87nLdh8iNmDGV0hp34x1xWwT9wDZHx2kfevSuXZJiutyiCFO323wMqDEg6eVKo3G3MEIPRJcuQ5R2nn4RaSm1s+6nnCmXKAgrFT1PiGTQ6/UG5S70gt35KB2l6QJL05bThA/XN/YIwrmxU/YIYvO7aaiyYuazkCM0bI37mUcPIEojHWxHGEfpSUKP0pWaImTOnWWXKEqNG5UajabuQ8OyM0kSzCI9guZSh8MR62RPEj5J7eyrgLC8LgrCNlRq6oCQhIaHTookyfFCuIDugI5E4mHa0/gfMPLl1B4hEw9hyd1V9yEuNPuESkWSS3SQHWCHh202R4dtr+H7p4xdqbtqQkY4yzsuj1BWv4suuVZ4QgMnI8MRoih9PGxLOIKDJlftu/2bRk2XnnIiH67vuH7vD24duZbNjYAGeUmlhijFG/4gehFpJP69YXT7ydra2qMfRtE4cM1JgJwrLpEQltxcIuJWCJLvEXUfjjgciVjQsr2lNJpGR6GJAN9uDgMSqpS7JLTtb6dLrgMIU96BQKh46ARCqhAtwA4cj8ByEaeoZ3e5YSe1+4ghOJVW3UNC2/6W+mndrGkk/NEJYcoMj7DgQ5ttxGErMkk/c/nJj/d/fHKtxieeQgOquMx1HwKiYl+lUqtV5Ph4LhdKJnPMOEkmSRVgq9UEVBgZT7jiFkkaojBN8YR67MNdUqVSESQBlCSpJoFWpZLBV2RYHJ+aYFbFkoZtXJhy/sOEWwyhVqcbNc5RHgMSRWZnpyyKHR+r5DIf56FCrmNU5Fg394YFH4zzgHVE9YrbLbTdby8UpvVCowdCcrj78eOx+OHw4tH8Ybx7/qh7nlTL6kJZuCeeSork2m/nchATGhmSwR48HDvkPAg+JGt5CICIcV8sAw2nyrqZT0JEaGJUMhKl3xi8wa9qOk3W85CTkxFNu+dUKpsxnkEBeaiEWgp9gSTgHeoQKjUUUtUpwuUN0TRDrCFXey1GodLso3YoI2WkCpIPEarOEJJb5Z+ENvqddMml19QJlQ+dHCFig6J5lk9GTIksSNs8rgN8RKNAb8o9ArU/7EPo828idO5siGP5rQsIcZQqQHLlVJ0Q0amJs4SyDfHMpJx4QgUm3II5Dc2l2IfwAcEx4jaIHgDQnxLLaliTx5XiCeVKOUpDTAi/1VBHgQj4EBzELJKMIPXimbo5cbUUeVCpVJYQoUrll6GpW4aKTa3X5/ME50hGdISw5hu4GFUqt8gQidYkFKP1jogZiXyai1JCfISVHTOfhErlUycFE0y+Wq3yc3e1u1olcR6m0/zY7de7RbRYgOzuDY2Cd6FuHO2/VPfRWPfjwyPQ4ePuo+6xJfUJwpRr2SO01e+iIfeBgXOhXLnvBEIG7RaH82i3GIbtYvioe5iEwAVCfn3a2CmLabNoq7hxkMpRkO458RFGGu2Gh92HIBSpMHrLaoTA6HyyKq5EdK2b+WavNBIqrraMNwqtFlyUHk9tPwtt9TtoqJQyoAhFiE+dmBCE5m4Sndio1FyblxHjdUJya2dZRINpyWXmk1CuLOH5hVuZ8FyqVh9vvn4/gfdfFKYrInKip7Kq4Qjlyl1uFUSEahlPeLxR+CcIGTgU+mGS0ZfviabWlEpmAzevoWao5qL0FCF3TuqfgPgMkSqCZJz7q+57Qlv+tnJz7V6JVHGCE9Unfajmz2ZkhM8Ps6maxCdRFYNLLE4cKuFmiAG1DInnbESlRnMpDtj6CZsPHoF9CR95726IxYkVl1mOy4wSzaRFBgjR8b0aHWCQ+Ayjfkx6BwGqyPE08vOeWJzoqeCJTYmaIRQalHAIK18dq6bT42gGV3GDjIpwQqFBlxbJah79JWyJJBNLFX09SJX72F3gu+HusbFDPHlX0+ioFPhUhM8n4880mBw8iMSJdnfZrDgmxDUTCJdgLj0qHD4+gsENKKtoqsnfIdG5lBrFK75co91wLQtt/x9rqLKv4eY1jhD5EEIQ5tLuwyMYuQto8obdYnw8nfZX02p0CQq+icwxpPOJ3v1z659HudzthmPCXb+Mr6XAOIZm78PDo8XD+NHR/FieHK/mx0nuSEqNJlW/br317/vywNANOwUfpEojww2gKm4uJcFz3IqxuFhN+5eOICe5IZw7U3wK83erL8KV0oGmgVB3uUYo4zo+Fl4vxqp+dIEGIaqh7CBKhpHvtPwNmGU3TGz1dghTG1dqVDJZbabhrngjMYfdacSaHqvm0R1D/qJzY6XS4g1jyL1uVtQOaJBMjBMXUwBV4ysziA+dtkGvYMCByJlQWvPcWbFzT+Nabu1a8xMK0kZCGL1xkJJUkmLqgk9UMNAQXGZCma2q8KmxDGpNpbV3fRyk/G5Yy0SnjCKJZDaZzdSVDWUoH9qc0A0a6eriYjeB7mFQy5wPD1r7PmH0si5uragBwvD9rXpOrUpm5rLZZF2TGQa2XwI7cQwPOkCogkW4pHG19CUaNxekx3jYi9vf5nKhbAijhfiHTOhOLkcxgEWOXz7qRl0DzXKEWrteaeXTDFcFH3UrT0lrMj3L5JIUxVBMlqLgVyZDZR6YTKYH289ytR6iIvOwQ60fVFr4UuklF+y++noWyrl3Op1Oq9ycmKOoOepqdi7LTDJz2YlMZtNkNGq1RtN2ToUZUcHJQzVt5WPFIfdqu7521o0ReUCtdi0zCUpSycm50NxkMnl1IvPIZNShJ02jz/AYkK5C1yDGNeUWTsSSO6XhL6kdEyJGrfFZhkomqQzAZTNAmZ3MZB6NGrWI0GgyvWBw0zg8TOedyvUWvq/G5WrHhPKThErw09oEBbU0k8xms+ghAx8/GjVpdTzicwpc2H10VFU59zda+Iq+q2w2GDBhPRHlPOHTbHZubm4SvaGHuezU1HdAqN3d1cKzptEfclzXIJ0PW/juL7trGQgVbyI0mna3nz9/8cOL5y9ePP8O3t2/eHHUZIQSm3m5bURefHCNHBurLpFov2jZUoM2p9rdCYhMrpDXMhExjI6OXsQaxTKBBzfnMhMTEy/va41GqDdOgggxzrstfLHUUz5o5wEVHKGi3jC0CKJRRqNRp32ZQYTZ7CZKSONT0ul07mlbmfBf7XwpxVcscJAqauUUC7CgBerqWgO+ibmrr+fWtOibdh/tPdXKu1qX0L6CCNFMgwEbfNgwwul06JH/bBd5cDJ59ZtXU1tyfkZoZcK2VXMjofxNhKf0dCLzirr1+tWtV1Mm7jvl+lYm/JkjrFPJ/wPg8Vd1m5nXV69evZW9+uqlDv3FyOWGFs7DtmVMKFco5X9EyF9clMuhnL5+nc1+lX2V3ZTjuDYctG4/bKuY2w31q04nfHWaEJUgOXa2bjP7+nUm+3V2cmIXngLClRaeaS514dXiP+RcY+w2SHc/8+p1JvNV9s4afIdCodlwte5cCqXmdwiP8VAB4iYfrNGXr25lM6+zd4woTs0t/ar8klmj+D1CuVJxTMjfywAPyu0QjK0TOBMNXeXWLTSgFbO+tjrp3kQor/uwLgWqTLr7a1OZ5FP4TLOy0rrrIWioTqirEep0ujcQnoDEX9KZdlE3bO9q8SPhsllfO7poUGOtaaQ6TkfunVJh6GpvaReCVjU4QHWnEHVnQpWnqjuTy8t2c0tnIZJ934AQ62zaU3482y7qgasAF5pXhQb4Y9k35PUo1eJTKG1tnfg9RDTIKuXtBx6h7X8b7XCA2lNqTMg3AYIMqVZPQl4Vkxbcp4VVUIuPRLV4LdTyGVnj5OsOelRwxUl+IBJA2IWfmmqeM9alNWrPpGSdFB10yDc8Qhv+Dhq6bzJydMenFtiR2rOIgIe/q3VXijeL2R7FXI0nM9ipWl3DOQaPNzr64PQPdBWDfGvbF9GZmun0ERQv/Ck+gXuwyfzxH9ea8jFr3z3/5Zf6EWL9RBHpF6znv675W/3+iz+Q3edjXq6tPfs30q8vfv3tt9/wh/9+9u1LxucTOd0ZFWmJ/gudNdmL7J/9L5L9HyYm5ckmuBovAAAAAElFTkSuQmCC",
  },
  {
    name: "Telecaster",
    model: "American Original 50s",
    price: "$1,999",
    img: "https://www.worldofmusic.com.au/wp-content/uploads/2024/07/Fender-Player-II-Telecaster-Butterscotch-Blonde-Electric-Guitar-Full.jpg",
  },
  {
    name: "Jaguar",
    model: "American Original 60s",
    price: "$2,099",
    img: "https://www.sweelee.ph/cdn/shop/files/products_2FF03-014-0580-500_2FF03-014-0580-500_1729073501440.jpg?v=1729073517&width=2048",
  },
  {
    name: "Mustang",
    model: "American Performer",
    price: "$1,199",
    img: "https://www.sweelee.com.my/cdn/shop/files/products_2FF03-014-9130-320_2FF03-014-9130-320_1695029861130.jpg?v=1695109286&width=2048",
  },
];

const FeaturedProducts = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Explore The Collection
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="p-4 bg-white border bottom-1 flex justify-center">
              <img src={p.img} alt={p.name} className="h-48 object-contain" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{p.model}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 ">
                  {p.price}
                </span>
                <button className="text-red-600 hover:text-red-800">
                  <FaPlusCircle className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
