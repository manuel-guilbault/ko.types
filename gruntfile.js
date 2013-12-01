module.exports = function (grunt) {

    function execCmd(cmd, args, done) {
        grunt.util.spawn({
            cmd: cmd,
            args: args
        }, function (error, result) {
            if (error) {
                grunt.log.error(error);
            } else {
                grunt.log.write(result);
            }
            done();
        });
    }

    var workingDir = "dist/_build";
    var bannerSrc = workingDir + "/banner.js";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            build: {
                src: [
                    bannerSrc,
                    "build/header.js",
                    "src/namespace.js",
                    "src/types/*.js",
                    "src/converters/*.js",
                    "src/koExtenders/*.js",
                    "build/footer.js"
                ],
                dest: "dist/<%= pkg.name %>.debug.js"
            }
        },
        uglify: {
            options: {
                banner: grunt.file.read("build/banner.tmpl")
            },
            build: {
                src: ["<%= concat.build.dest %>"],
                dest: "dist/<%= pkg.name %>.js"
            }
        },
        jshint: {
            build: {
                src: [
                    "<%= concat.build.dest %>"
                ]
            }
        },
        jasmine: {
            options: {
                vendor: [
                    "node_modules/knockout/build/output/knockout-latest.js",
                    "node_modules/knockout.validation/Dist/knockout.validation.js",
                    "node_modules/moment/min/moment-with-langs.js",
                    "node_modules/globalize/lib/globalize.js",
                    "node_modules/globalize/lib/cultures/globalize.cultures.js"
                ],
                helpers: [
                    "test/convertHelper.js",
                    "test/jasmineExtensions.js"
                ],
                specs: ["test/Spec/**/*Spec.js"]
            },
            build: {
                src: ["<%= concat.build.dest %>"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");

    grunt.registerTask("prepare", "Prepare the build", function () {
        grunt.file.mkdir(workingDir);
    });
    grunt.registerTask("generateBanner", "Generate the banner", function () {
        var bannerTmpl = grunt.file.read("build/banner.tmpl");
        var banner = grunt.template.process(bannerTmpl);
        grunt.file.write(bannerSrc, banner);
    });
    grunt.registerTask("nugetPack", "Create a NuGet package", function () {
        execCmd("nuget.exe", [
            //specify the .nuspec file
            "pack", "build/ko.types.nuspec",

            //specify where we want the package to be created
            "-OutputDirectory", "dist",

            // specify base path as project root directory
            "-BasePath", ".",

            //override the version with whatever is currently defined in package.json
            "-Version", grunt.config.get("pkg").version
        ], this.async());
    });
    grunt.registerTask("nugetPush", "Publish a NuGet package", function () {
        var args = ["push", "dist\\*.nupkg"];

        var apiKey = grunt.option("apiKey");
        if (apiKey) {
            args = args.concat(["-ApiKey", apiKey]);
        }

        execCmd("nuget.exe", args, this.async());
    });
    grunt.registerTask("npmPush", "Publish a NPM package", function () {
        execCmd("cmd.exe", ["/C", "npm", "publish"], this.async());
    });
    grunt.registerTask("clean", "Cleaning build directory", function () {
        grunt.file.delete(workingDir);
    });

    grunt.registerTask("assemble", ["prepare", "generateBanner", "concat", "uglify", "clean"]);
    grunt.registerTask("runTest", ["jshint", "jasmine"]);
    grunt.registerTask("test", ["assemble", "runTest"]);
    grunt.registerTask("build", ["test", "nugetPack"]);
    grunt.registerTask("publish", ["nugetPush", "npmPush"]);
    grunt.registerTask("buildAndPublish", ["build", "publish"]);

    grunt.registerTask("default", ["build"]);
};