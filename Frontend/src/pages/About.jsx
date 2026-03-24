import React from "react";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter"
function About(){
    return(<> 
    <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={"US"}></Title>
    </div>
    <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src="vite.svg" className="w-full md:max-w-[450px]" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, exercitationem impedit inventore voluptate animi fugit vero mollitia illo perferendis nemo quaerat iste, molestias autem? Optio rerum aperiam eos sapiente tempore.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos dolores eum hic veritatis commodi recusandae nesciunt ipsam distinctio quia, fuga tempore! Neque mollitia molestias temporibus accusamus? Accusantium cum voluptatibus ex ea reprehenderit temporibus dolore, facere impedit ipsa inventore ut fuga beatae, quasi omnis sint maiores, ratione assumenda natus quaerat error sed odit praesentium id neque? Excepturi, mollitia odio reiciendis laborum molestiae cum explicabo delectus provident sed quos vero atque dolores id culpa quaerat quo aliquam magnam deserunt ad saepe maiores? Deleniti praesentium voluptatibus, dolorum nihil harum blanditiis est libero dolorem enim iste numquam in doloremque reprehenderit porro aspernatur ut sunt qui, ex quasi doloribus. Quidem amet distinctio iusto rem ullam quas at ratione tempora, laborum minus nam ipsa laudantium animi?</p>
            <b className="text-gray-800">OUR MISSION</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta necessitatibus maxime blanditiis reprehenderit veritatis temporibus magnam pariatur, adipisci voluptate omnis asperiores porro atque deleniti, eaque unde odio, qui tenetur! Voluptates modi velit ipsam corporis, totam eum quo quia cupiditate minus sunt numquam rerum quos, necessitatibus esse magnam architecto culpa molestias maxime odit omnis blanditiis? Earum perspiciatis error consequuntur quas, esse nesciunt accusamus blanditiis ullam quos vitae? Accusamus veniam porro repellendus! Eos neque nesciunt eius alias recusandae quam consectetur hic. Dolorum sed cupiditate ullam vero accusamus repellendus aliquam! Numquam minus, tempora vel aliquam quibusdam facilis eius voluptates recusandae? In doloribus consectetur assumenda minus ipsam eum voluptate fugiat provident, quaerat incidunt esse alias quidem, ipsum sit voluptatem. Commodi ad minima, et iure doloremque non obcaecati quo! Quod neque nulla adipisci voluptatem? Ullam nobis recusandae quaerat quam aut ipsa, tempora sequi debitis sit deleniti quidem, cum sed. Minima aut recusandae voluptatibus. Impedit esse fuga temporibus numquam delectus quos dolorum iste molestias sapiente dicta, laborum facilis repellat labore, tenetur praesentium. Vel a, voluptas error aliquam nesciunt qui nisi ullam fugiat voluptate. Nobis consectetur excepturi magnam corporis esse beatae distinctio, veniam delectus quod et iusto sint quibusdam commodi eligendi possimus. Necessitatibus libero provident odio aspernatur voluptatum nobis rem ex quia deleniti voluptates consequatur veniam, harum illum et minima quibusdam architecto porro doloribus perferendis id. Culpa porro fugit reiciendis blanditiis accusamus cum praesentium inventore minus fuga accusantium doloribus sint quas unde ea amet ullam ut sequi quaerat consectetur cumque, veritatis maiores. Nulla, culpa quod. Ut, neque.</p>
        </div>
    </div>
    <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
    </div>
    <div className="flex flex-col md:flex-row rext-sm mb-20">
        <div className="border px-10 md:px-16 oy-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance: </b>
            <p className="text-gray-600">We meticulously Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quidem dolores molestias accusamus nisi quasi voluptas consectetur at suscipit, ad sunt eos officiis praesentium quam nesciunt voluptatum odit officia assumenda facilis ea excepturi repellat? Blanditiis, autem modi? Error iure, neque obcaecati odio sed temporibus cupiditate possimus culpa velit adipisci accusantium. Sunt eius quisquam amet explicabo ab placeat vitae fuga a.</p>
        </div>
        <div className="border px-10 md:px-16 oy-8 sm:py-20 flex flex-col gap-5">
            <b>Convinience: </b>
            <p className="text-gray-600">We meticulously Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quidem dolores molestias accusamus nisi quasi voluptas consectetur at suscipit, ad sunt eos officiis praesentium quam nesciunt voluptatum odit officia assumenda facilis ea excepturi repellat? Blanditiis, autem modi? Error iure, neque obcaecati odio sed temporibus cupiditate possimus culpa velit adipisci accusantium. Sunt eius quisquam amet explicabo ab placeat vitae fuga a.</p>
        </div>
        <div className="border px-10 md:px-16 oy-8 sm:py-20 flex flex-col gap-5">
            <b>Excetional Customer Service: </b>
            <p className="text-gray-600">We meticulously Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quidem dolores molestias accusamus nisi quasi voluptas consectetur at suscipit, ad sunt eos officiis praesentium quam nesciunt voluptatum odit officia assumenda facilis ea excepturi repellat? Blanditiis, autem modi? Error iure, neque obcaecati odio sed temporibus cupiditate possimus culpa velit adipisci accusantium. Sunt eius quisquam amet explicabo ab placeat vitae fuga a.</p>
        </div>
    </div>
    <NewsLetter />
    </>);
}

export default About;