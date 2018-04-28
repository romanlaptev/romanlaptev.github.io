mvn archetype:generate
rem (groupId: ru.apache_maven) or (groupId: com)
rem (artifactId: App2)

REM usage: mvn [options] [<goal(s)>] [<phase(s)>]

REM Options:
 REM -am,--also-make                        If project list is specified, also
                                        REM build projects required by the
                                        REM list
 REM -amd,--also-make-dependents            If project list is specified, also
                                        REM build projects that depend on
                                        REM projects on the list
 REM -B,--batch-mode                        Run in non-interactive (batch)
                                        REM mode (disables output color)
 REM -b,--builder <arg>                     The id of the build strategy to
                                        REM use
 REM -C,--strict-checksums                  Fail the build if checksums don't
                                        REM match
 REM -c,--lax-checksums                     Warn if checksums don't match
 REM -cpu,--check-plugin-updates            Ineffective, only kept for
                                        REM backward compatibility
 REM -D,--define <arg>                      Define a system property
 REM -e,--errors                            Produce execution error messages
 REM -emp,--encrypt-master-password <arg>   Encrypt master security password
 REM -ep,--encrypt-password <arg>           Encrypt server password
 REM -f,--file <arg>                        Force the use of an alternate POM
                                        REM file (or directory with pom.xml)
 REM -fae,--fail-at-end                     Only fail the build afterwards;
                                        REM allow all non-impacted builds to
                                        REM continue
 REM -ff,--fail-fast                        Stop at first failure in
                                        REM reactorized builds
 REM -fn,--fail-never                       NEVER fail the build, regardless
                                        REM of project result
 REM -gs,--global-settings <arg>            Alternate path for the global
                                        REM settings file
 REM -gt,--global-toolchains <arg>          Alternate path for the global
                                        REM toolchains file
 REM -h,--help                              Display help information
 REM -l,--log-file <arg>                    Log file where all build output
                                        REM will go (disables output color)
 REM -llr,--legacy-local-repository         Use Maven 2 Legacy Local
                                        REM Repository behaviour, ie no use of
                                        REM _remote.repositories. Can also be
                                        REM activated by using
                                        REM -Dmaven.legacyLocalRepo=true
 REM -N,--non-recursive                     Do not recurse into sub-projects
 REM -npr,--no-plugin-registry              Ineffective, only kept for
                                        REM backward compatibility
 REM -npu,--no-plugin-updates               Ineffective, only kept for
                                        REM backward compatibility
 REM -nsu,--no-snapshot-updates             Suppress SNAPSHOT updates
 REM -o,--offline                           Work offline
 REM -P,--activate-profiles <arg>           Comma-delimited list of profiles
                                        REM to activate
 REM -pl,--projects <arg>                   Comma-delimited list of specified
                                        REM reactor projects to build instead
                                        REM of all projects. A project can be
                                        REM specified by [groupId]:artifactId
                                        REM or by its relative path
 REM -q,--quiet                             Quiet output - only show errors
 REM -rf,--resume-from <arg>                Resume reactor from specified
                                        REM project
 REM -s,--settings <arg>                    Alternate path for the user
                                        REM settings file
 REM -t,--toolchains <arg>                  Alternate path for the user
                                        REM toolchains file
 REM -T,--threads <arg>                     Thread count, for instance 2.0C
                                        REM where C is core multiplied
 REM -U,--update-snapshots                  Forces a check for missing
                                        REM releases and updated snapshots on
                                        REM remote repositories
 REM -up,--update-plugins                   Ineffective, only kept for
                                        REM backward compatibility
 REM -v,--version                           Display version information
 REM -V,--show-version                      Display version information
                                        REM WITHOUT stopping build
 REM -X,--debug                             Produce execution debug output
