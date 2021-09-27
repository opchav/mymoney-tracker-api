import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTransactions1632777071282 implements MigrationInterface {
    name = 'CreateTransactions1632777071282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`example_db\`.\`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(160) NOT NULL, \`note\` varchar(255) NOT NULL, \`paid\` tinyint NOT NULL, \`txAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`amount\` decimal(10,2) NOT NULL, \`txType\` enum ('income', 'expense', 'transfer') NOT NULL DEFAULT 'expense', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`example_db\`.\`users\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`example_db\`.\`articles\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`example_db\`.\`transactions\` ADD CONSTRAINT \`FK_431c7f64542dae04698928c5c8b\` FOREIGN KEY (\`ownerId\`) REFERENCES \`example_db\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`example_db\`.\`transactions\` DROP FOREIGN KEY \`FK_431c7f64542dae04698928c5c8b\``);
        await queryRunner.query(`ALTER TABLE \`example_db\`.\`articles\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`example_db\`.\`users\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`example_db\`.\`transactions\``);
    }

}
