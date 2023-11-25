import { getServerAuthSession } from "~/server/auth";

export const metadata = {
    title: "Come over here... to the dashboard",
};

export default async function DashboardPage() {
    const session = await getServerAuthSession();

    return (
        <div className="flex w-full flex-col gap-4">
            <div>
                Hello there, {session?.user.name}, welcome to the Dashboard
            </div>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                aperiam hic, asperiores nostrum laboriosam quasi, eveniet odit
                enim dignissimos cum officia facilis consectetur? Dignissimos
                expedita velit et. Obcaecati, impedit eveniet. Asperiores rem
                corrupti totam recusandae, obcaecati aliquam voluptas similique,
                accusantium eius nulla quia. Itaque, molestias. Architecto
                veniam rerum quae reiciendis, vitae consequatur porro ut culpa,
                error et eligendi placeat facere. Voluptatem praesentium neque
                error optio expedita possimus tempora dicta voluptatum at labore
                quod iure debitis quam placeat nihil enim a cumque accusamus,
                nobis assumenda. Consectetur sapiente officiis reprehenderit
                quam perferendis? Dolore ipsa odio dolorum minima velit quisquam
                quibusdam maxime sequi odit porro, a adipisci. Excepturi cumque
                aperiam in alias totam, culpa facere dolores, voluptates
                consequuntur earum libero. Placeat, eum similique. Amet
                voluptatibus porro inventore illo pariatur! Harum nobis a error
                assumenda, aperiam quibusdam incidunt ducimus corporis ratione
                asperiores molestiae maiores, excepturi facilis, quos possimus
                dicta perferendis laborum maxime aliquam exercitationem? Unde
                consequuntur necessitatibus suscipit nemo tempore voluptatem
                eaque totam, quam vel dolor repudiandae dolores placeat esse
                quidem corporis deleniti incidunt aperiam maxime pariatur. Iste
                laborum enim porro placeat error modi? Obcaecati, officia fugit!
                Vel eos soluta quis similique voluptates maxime illo
                exercitationem iusto, tenetur quod voluptatem dicta in error,
                esse fugiat quae eligendi nostrum quam officiis facilis, labore
                obcaecati optio. Incidunt officiis rerum numquam nulla, eius,
                distinctio corrupti inventore quis dolor quisquam tempora atque
                dolores quod earum ipsam enim. Quidem culpa debitis dolorem iste
                sunt cumque magni cum vitae vel. Beatae voluptates, quos
                sapiente similique dolores, reiciendis ipsam natus quis
                consequatur, earum est maxime impedit optio cum illum. Atque
                tempore obcaecati nesciunt commodi, ratione esse eaque autem
                deleniti voluptatibus laborum. Rerum nulla est maiores eius
                repellendus suscipit natus temporibus, repudiandae et minus quas
                quasi, ratione nisi cum voluptatum possimus mollitia esse iure?
                Voluptates eligendi at quae minima expedita architecto ducimus!
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                aperiam hic, asperiores nostrum laboriosam quasi, eveniet odit
                enim dignissimos cum officia facilis consectetur? Dignissimos
                expedita velit et. Obcaecati, impedit eveniet. Asperiores rem
                corrupti totam recusandae, obcaecati aliquam voluptas similique,
                accusantium eius nulla quia. Itaque, molestias. Architecto
                veniam rerum quae reiciendis, vitae consequatur porro ut culpa,
                error et eligendi placeat facere. Voluptatem praesentium neque
                error optio expedita possimus tempora dicta voluptatum at labore
                quod iure debitis quam placeat nihil enim a cumque accusamus,
                nobis assumenda. Consectetur sapiente officiis reprehenderit
                quam perferendis? Dolore ipsa odio dolorum minima velit quisquam
                quibusdam maxime sequi odit porro, a adipisci. Excepturi cumque
                aperiam in alias totam, culpa facere dolores, voluptates
                consequuntur earum libero. Placeat, eum similique. Amet
                voluptatibus porro inventore illo pariatur! Harum nobis a error
                assumenda, aperiam quibusdam incidunt ducimus corporis ratione
                asperiores molestiae maiores, excepturi facilis, quos possimus
                dicta perferendis laborum maxime aliquam exercitationem? Unde
                consequuntur necessitatibus suscipit nemo tempore voluptatem
                eaque totam, quam vel dolor repudiandae dolores placeat esse
                quidem corporis deleniti incidunt aperiam maxime pariatur. Iste
                laborum enim porro placeat error modi? Obcaecati, officia fugit!
                Vel eos soluta quis similique voluptates maxime illo
                exercitationem iusto, tenetur quod voluptatem dicta in error,
                esse fugiat quae eligendi nostrum quam officiis facilis, labore
                obcaecati optio. Incidunt officiis rerum numquam nulla, eius,
                distinctio corrupti inventore quis dolor quisquam tempora atque
                dolores quod earum ipsam enim. Quidem culpa debitis dolorem iste
                sunt cumque magni cum vitae vel. Beatae voluptates, quos
                sapiente similique dolores, reiciendis ipsam natus quis
                consequatur, earum est maxime impedit optio cum illum. Atque
                tempore obcaecati nesciunt commodi, ratione esse eaque autem
                deleniti voluptatibus laborum. Rerum nulla est maiores eius
                repellendus suscipit natus temporibus, repudiandae et minus quas
                quasi, ratione nisi cum voluptatum possimus mollitia esse iure?
                Voluptates eligendi at quae minima expedita architecto ducimus!
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                aperiam hic, asperiores nostrum laboriosam quasi, eveniet odit
                enim dignissimos cum officia facilis consectetur? Dignissimos
                expedita velit et. Obcaecati, impedit eveniet. Asperiores rem
                corrupti totam recusandae, obcaecati aliquam voluptas similique,
                accusantium eius nulla quia. Itaque, molestias. Architecto
                veniam rerum quae reiciendis, vitae consequatur porro ut culpa,
                error et eligendi placeat facere. Voluptatem praesentium neque
                error optio expedita possimus tempora dicta voluptatum at labore
                quod iure debitis quam placeat nihil enim a cumque accusamus,
                nobis assumenda. Consectetur sapiente officiis reprehenderit
                quam perferendis? Dolore ipsa odio dolorum minima velit quisquam
                quibusdam maxime sequi odit porro, a adipisci. Excepturi cumque
                aperiam in alias totam, culpa facere dolores, voluptates
                consequuntur earum libero. Placeat, eum similique. Amet
                voluptatibus porro inventore illo pariatur! Harum nobis a error
                assumenda, aperiam quibusdam incidunt ducimus corporis ratione
                asperiores molestiae maiores, excepturi facilis, quos possimus
                dicta perferendis laborum maxime aliquam exercitationem? Unde
                consequuntur necessitatibus suscipit nemo tempore voluptatem
                eaque totam, quam vel dolor repudiandae dolores placeat esse
                quidem corporis deleniti incidunt aperiam maxime pariatur. Iste
                laborum enim porro placeat error modi? Obcaecati, officia fugit!
                Vel eos soluta quis similique voluptates maxime illo
                exercitationem iusto, tenetur quod voluptatem dicta in error,
                esse fugiat quae eligendi nostrum quam officiis facilis, labore
                obcaecati optio. Incidunt officiis rerum numquam nulla, eius,
                distinctio corrupti inventore quis dolor quisquam tempora atque
                dolores quod earum ipsam enim. Quidem culpa debitis dolorem iste
                sunt cumque magni cum vitae vel. Beatae voluptates, quos
                sapiente similique dolores, reiciendis ipsam natus quis
                consequatur, earum est maxime impedit optio cum illum. Atque
                tempore obcaecati nesciunt commodi, ratione esse eaque autem
                deleniti voluptatibus laborum. Rerum nulla est maiores eius
                repellendus suscipit natus temporibus, repudiandae et minus quas
                quasi, ratione nisi cum voluptatum possimus mollitia esse iure?
                Voluptates eligendi at quae minima expedita architecto ducimus!
            </p>
        </div>
    );
}
